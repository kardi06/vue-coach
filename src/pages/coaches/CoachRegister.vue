<template>
    <section>
        <base-card>
            <h2>Register Coach</h2>
            <coach-form></coach-form>
        </base-card>
    </section>
</template>
<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
    components: {
        CoachForm,
    }
}
</script>

