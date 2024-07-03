<template>
    <div>
        <base-dialog :show="!!error" title="An error occured!!" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <section>
            <coach-filter @change-filter="setFilters"></coach-filter>
        </section>
        <section>
            <base-card>
                <div class="controls">
                    <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
                    <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">Login to Register as Coach</base-button>
                    <base-button link to="register" v-if="isLoggedIn &&!isCoach && !isLoading">Register as Coach</base-button>
                </div>
                <div v-if="isLoading">
                    <base-spinner></base-spinner>
                </div>
                <ul v-else-if="hasCoach">
                    <coach-item v-for="coach in filterCoaches" :key="coach.id" :id="coach.id" :first-name="coach.firstName"
                        :last-name="coach.lastName" :areas="coach.areas" :rate="coach.hourlyRate"></coach-item>
                </ul>
                <h1 v-else>No Coaches</h1>
            </base-card>
        </section>
    </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';
export default {
    data() {
        return {
            isLoading: false,
            error: null,
            activeFilters: {
                frontend: true,
                backend: true,
                career: true,
            }
        }
    },
    components: {
        CoachItem,
        CoachFilter
    },
    computed: {
        isLoggedIn(){
            return this.$store.getters.isAuthenticated;
        },
        filterCoaches() {
            // return this.$store.getters['coaches/coaches'];
            const coaches = this.$store.getters['coaches/coaches'];
            return coaches.filter(coach => {
                if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
                    return true;
                }
                if (this.activeFilters.backend && coach.areas.includes('backend')) {
                    return true;
                }
                if (this.activeFilters.career && coach.areas.includes('career')) {
                    return true;
                }
                return false;
            });
        },
        hasCoach() {
            return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
        },
        isCoach() {
            return this.$store.getters['coaches/isCoach'];
        }
    },
    created() {
        this.loadCoaches();
    },
    methods: {
        setFilters(updatedFilter) {
            this.activeFilters = updatedFilter;
        },
        async loadCoaches(refresh = false) {
            this.isLoading = true;
            try {
                await this.$store.dispatch('coaches/loadCoaches', { forceFetch: refresh });
            } catch (error) {
                this.error = error.message || 'Something went wrong';
            }
            this.isLoading = false;
        },
        handleError() {
            this.error = null;
        }
    }
}
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.controls {
    display: flex;
    justify-content: space-between;
}
</style>