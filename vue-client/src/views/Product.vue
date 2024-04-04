<script setup>
import { onMounted, ref, watch, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { getProducts } from "@/services/product-service";

// const currentPage = ref(1);
// // const page = ref(1);
// const item_per_page = ref(5);

const paginate = reactive({ page: 1, item_per_page: 5 });

const router = useRouter();
const route = useRoute();

const nextPage = () => {
  const nextPage = parseInt(route.query.page || 1) + 1;
  //   currentPage.value = nextPage;
  paginate.page = nextPage;
  router.push({
    path: "/products",
    // query: { page: currentPage.value, item_per_page: item_per_page.value },
    query: { page: paginate.page, item_per_page: paginate.item_per_page },
  });
};
const prePage = () => {
  const prePage = parseInt(route.query.page || 1) - 1;
  //   currentPage.value = prePage;
  //   page.value = prePage;
  paginate.page = prePage;
  router.push({
    path: "/products",
    // query: { page: currentPage.value, item_per_page: item_per_page.value },
    query: { page: paginate.page, item_per_page: paginate.item_per_page },
  });
};

onMounted(() => {
  //   if (route.query.page) {
  //     currentPage.value = parseInt(route.query.page) || 1;
  //   }
  //   currentPage.value = parseInt(route.query.page) || 1;
  //   item_per_page.value = parseInt(route.query.item_per_page) || 5;
  paginate.page = parseInt(route.query.page) || 1;
  paginate.item_per_page = parseInt(route.query.item_per_page) || 5;
});

// watch(route, () => {
//   page.value = parseInt(route.query.page) || 1;
//   //   console.log(paginate.page);
//   item_per_page.value = parseInt(route.query.item_per_page) || 5;
// });

const { isLoading, data: productList } = useQuery({
  //   queryKey: ["products", currentPage, item_per_page],
  queryKey: ["products", paginate],
  queryFn: () =>
    getProducts({
      page: paginate.page,
      item_per_page: paginate.item_per_page,
    }),
});
</script>

<template>
  <h3 class="text-3xl">Product</h3>
  <p v-if="isLoading">Loading...</p>
  <ul v-else>
    <li v-for="product in productList.data.data" :key="product.id">
      {{ product.name }}
    </li>
  </ul>
  <div>
    <Button @click="prePage">Pre</Button>
    <Button @click="nextPage" class="ml-2">Next</Button>
  </div>
</template>
