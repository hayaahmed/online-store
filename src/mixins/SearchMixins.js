export default {
    computed:
    {
        filterproducts: function () {
            return this.products.filter((product) => {
                return product.name.match(this.search)
            });
        }
    }
}