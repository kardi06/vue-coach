<template>
    <base-dialog :show="!!error" title="An error occured!!" @close="handleError">
        <p>{{ error }}</p>
    </base-dialog>
    <section>
        <base-card>
            <header>
                <h2>Request Received</h2>
            </header>
            <base-spinner v-if="isLoading"></base-spinner>
            <ul v-else-if="hasRequests && !isLoading">
                <request-item v-for="req in receivedRequest" :key="req.id" :email="req.userEmail"
                    :message="req.message"></request-item>
            </ul>
            <h3 v-else>You haven't received any request yet</h3>
        </base-card>
    </section>
</template>
<script>
import RequestItem from '../../components/request/RequestItem';
export default {
    components: {
        RequestItem,
    },
    data(){
        return {
            isLoading: false,
            error : null
        }
    },
    computed: {
        receivedRequest() {
            return this.$store.getters['requests/requests'];
        },
        hasRequests() {
            return this.$store.getters['requests/hasRequests'];
        },
    },
    created(){
        this.loadRequest();
    },
    methods:{
        async loadRequest(){
            this.isLoading = true;
            try{
                await this.$store.dispatch('requests/fetchRequest');
            }catch (error){
                this.error = error.message || 'Something Failed';
            }
            this.isLoading = false;
        },
        handleError(){
            this.error = null;
        }
    }
}
</script>

<style scoped>
header {
    text-align: center;
}

ul {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 30rem;
}

h3 {
    text-align: center;
}
</style>

