<template>
  <v-category @selectCategory="onSelectCategory"></v-category>
  <template v-if="loading">
    <v-loading></v-loading>
  </template>
  <Transition>
    <template v-if="!loading">
      <main class="container-fluid">
        <h1>{{ header }}</h1>

        <div class="row">
          <template v-for="item in filteredItems" :key="item.id">
            <v-item :item="item">

            </v-item>
          </template>
          <template v-if="!filteredItems.length">
            <div class="col">
              Items not found
            </div>
          </template>
          <template v-if="selectedCategory">
            <div class="w-100"></div>
            <div class="col">
              <a @click="showPopularItems()" class="btn btn-secondary">show all items</a>
            </div>
          </template>
        </div>
      </main>
    </template>
  </Transition>
</template>

<script>
import vCategory from "@/components/layout/vCategory.vue";
import vItem from "@/components/layout/vItem.vue";
import vLoading from "@/components/layout/vLoading.vue";

import {mapGetters, mapState} from 'vuex'

export default {
  name: "Home",

  components: {
    vCategory,
    vItem,
    vLoading
  },

  data() {
    return {
      header: "",
      loading: true,
    }
  },

  created() {
    setTimeout(() => {
      this.loading = false;
    }, import.meta.env.VITE_TIMEOUT || 500);
    if (this.$route.name === "category") {
      const categorySlugFromUrl = this.$route.params.category;
      this.selectedCategory = this.$store.getters.getCategoryBySlug(categorySlugFromUrl)[0].id;
      this.changeHeader(this.$store.getters.getCategoryBySlug(categorySlugFromUrl)[0].title);
    } else {
      this.changeHeader();
    }
  },

  methods: {
    onSelectCategory(category) {
      if (this.loading) return;
      // console.log(category.id, this.selectedCategory);
      if (category.id === this.selectedCategory) return;
      this.selectedCategory = category.id;
      this.loading = true;
      this.changeHeader(category.title);
      this.$router.push({name: 'category', params: {locale: this.$i18n.locale, category: category.slug}});
      setTimeout(() => {
        this.loading = false;
      }, import.meta.env.VITE_TIMEOUT || 500);
    },

    showPopularItems() {
      if (this.loading) return;
      this.selectedCategory = null;
      this.loading = true;
      this.changeHeader();
      setTimeout(() => {
        this.loading = false;
      }, import.meta.env.VITE_TIMEOUT || 500);
    },

    changeHeader(title = this.$options.popularItemsTitle) {
      if(this.search.length){
        this.header = "Search...";
      } else {
        this.header = title;
      }
    }
  },

  computed: {
    ...mapState({
      search: state => state.items.search,
      items: state => state.items.allItems,
    }),

    ...mapGetters([
      'popularItems',
    ]),

    filteredItems() {
      if (this.search) {
        return this.items.filter(search => search.title.toLowerCase().includes(this.search.toLowerCase()));
      }
      if (this.selectedCategory) {
        return this.$store.getters.getItemsByCategory(this.selectedCategory);
      }
      return this.popularItems;
    },

    selectedCategory: {
      get() {
        return this.$store.state.categories.selectedCategory;
      },
      set(value) {
        this.$store.commit('setSelectedCategory', value);
      }
    },
  },

  popularItemsTitle: "Popular items",

  watch: {
    search(newValue, oldValue) {
      this.changeHeader();
      if (this.search.length > 0 && this.search.length <= 1 && oldValue <= 2) {
        this.loading = true;
        this.selectedCategory = null;
        setTimeout(() => {
          this.loading = false;
        }, import.meta.env.VITE_TIMEOUT || 500);
      }
    },

    selectedCategory(newValue) {
      // console.log('selected category changed', newValue)
      if (!newValue) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, import.meta.env.VITE_TIMEOUT || 500);
      }
    }
  }
}
</script>

<style scoped lang="scss">
.v-enter-active {
  transition: all .3s ease;
}

.v-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
</style>