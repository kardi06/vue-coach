<template>
    <section>
        <base-card>
            <header>
                <h2>Request Received</h2>
            </header>
            <ul v-if="hasRequests">
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
    computed: {
        receivedRequest() {
            return this.$store.getters['requests/requests'];
        },
        hasRequests() {
            return this.$store.getters['requests/hasRequests'];
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

