<template>
    <div>
        <base-dialog :show="!!error" title="An Error Occured" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <base-dialog :show="isLoading" title="Authenticating..." fixed>
            <base-spinner></base-spinner>
        </base-dialog>
        <base-card>
            <form @submit.prevent="submitForm">
                <div class="form-control">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model.trim="email">
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model.trim="password">
                </div>
                <p v-if="!formIsValid">Please enter valid email and password (must be at least 6 character long)</p>
                <base-button>{{ submitButtonCaption }}</base-button>
                <base-button type="button" @click="switchAuthMode" mode="flat">{{ switchModeButtonCaption }}</base-button>
            </form>
        </base-card>
    </div>   
</template>

<script>
// import { handleError } from 'vue';

export default{
    data(){
        return{
            email:'',
            password:'',
            formIsValid:true,
            mode:'login',
            isLoading: false,
            error: null
        };
    },
    computed:{
        submitButtonCaption(){
            if(this.mode === 'login'){
                return 'Login';
            }else{
                return 'Signup';
            }
        },
        switchModeButtonCaption(){
            if(this.mode === 'login'){
                return 'Signup instead';
            }else{
                return 'Login instead';
            }
        }
    },
    methods:{
        async submitForm(){
            this.formIsValid = true;
            if(this.email === '' || !this.email.includes('@') || this.password.length < 6 ){
                this.formIsValid = false;
                return;
            }

            this.isLoading == true;

            try{
                if(this.mode === 'login'){
                //..
                }else{
                    await this.$store.dispatch('signup',{
                        email:this.email,
                        password: this.password
                    })
                }
            }catch (err){
                this.error = err.message || 'Failed to Authenticate, Check your login data.';
            }

            this.isLoading == false;
        },
        switchAuthMode(){
            if(this.mode === 'login'){
                this.mode = 'signup';
            }else{
                this.mode = 'login';
            }
        },
        handleError(){
            this.error = null;
        }
    }    
}
</script>
<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>