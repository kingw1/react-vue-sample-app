<template>
    <div>
        <p>
            <RouterLink to="/" class="btn btn-outline-secondary">back to post list</RouterLink>
        </p>

        <form @submit.prevent="onSubmit">
            <h1>
                {{ model.id ? 'Edit Post' : 'Create new post' }}
            </h1>
            <div class="mb-3">
                <input
                    type="text"
                    class="form-control"
                    placeholder="Post Title"
                    v-model="model.title"
                />
            </div>
            <div class="mb-3">
                <textarea
                    type="text"
                    class="form-control"
                    placeholder="Post body"
                    v-model="model.body"
                ></textarea>
            </div>
            <p>
                <button
                    :disabled="!model.title || !model.body"
                    type="submit"
                    class="btn btn-success"
                >Submit</button>
            </p>
        </form>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router';
    import { useStore } from 'vuex'

    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const model = ref({
        id: '',
        title: '',
        body: ''
    })

    onMounted(async () => {
        if (!route.params.id) {
            return;
        }

        model.value = await store.dispatch('getSinglePost', route.params.id)
    })

    function onSubmit() {
        store.dispatch('savePost', model.value)
        .then(() => {
            router.push('/')
        })
    }
</script>

<style>

</style>