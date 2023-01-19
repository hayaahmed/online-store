<template>
    <div class="landing">
        <div class="content">
            <h3>Hi🤩,Welcome</h3>
            <p>Shopping: because happiness is not a destination, it's a journey. 💞✭</p>
        </div>
        <div class="image">
            <img src="../images/pexels-tiff-ng-3302537.jpg" alt="">
        </div>
    </div>    
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Satisfy&display=swap');
$black: #130f40;
$font-color:darkcyan;
.landing{
    display: flex;
        align-items: center;
        flex-wrap: wrap-reverse;
        gap: 2rem;
        margin: 2rem;
        margin-bottom: 0.5rem;
        background-color: white;
        height: 30rem;
        border-radius: 1rem;
        overflow: hidden;
        position: relative;
        .image{
            flex: 1 1 20rem;
            border-radius: 1rem;
            img{
                width: 100%;
                height: 30rem;
                border-radius: 1rem;
                @media (max-width:768px) {
                  height: 20rem;

                    }
            }
        }
        .content{
            flex:1 1 20rem;
            padding: 1rem .5rem;
            text-align: center;
 
            h3{
                font-family: 'Satisfy', cursive;
                font-size: 3rem;
                color: $font-color;
                @media (max-width:768px) {
                font-size: 2rem;

                    }
            }
            p{
                font-size: 1rem;
                color: rgb(94, 92, 92);
                text-transform: capitalize;
            }
        }
}

</style>