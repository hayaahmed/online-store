<template>
    <div class="footer mt-5">
        <div class="newsletter">
            <h3>Contact Us</h3>
            <form action="">
                <input class="email" type="email" name="" placeholder="enter your email" id="">
                <input class="submit" type="submit" value="subscribe">
            </form>
        </div>
        <div class="box-container pt-5">
            <div class="row">
                <div class="col-lg-4 col-md-12">
                    <div class="box">
                <h3>quick links</h3>
                <a href="#home"> <i class="fas fa-arrow-right"></i> home</a>
                <a href="#about"> <i class="fas fa-arrow-right"></i> about</a>
              <a href="#categories"><i class="fas fa-arrow-right"></i>categiries</a>
            </div>
                </div>
                <div class="col-lg-4 col-md-12">
                    <div class="box">
                <h3>extra links</h3>
                <router-link :to="{name:'MyCart'}">
                <a href="#"> <i class="fas fa-arrow-right"></i> my order</a>
            </router-link>
                <router-link :to="{name:'Profile'}">
                    <a href="#"> <i class="fas fa-arrow-right"></i> my profile</a>
                 </router-link>
                
                <a href="#"> <i class="fas fa-arrow-right"></i> terms of use</a>
                <a href="#"> <i class="fas fa-arrow-right"></i> privary policy</a>
            </div>
                </div>
            </div>
            <div class="copyright">
      <p class="copyright">&copy; <span>2022</span>  All Right Reserved <span>coded by haya</span></p>
    </div>
        </div>
      
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Satisfy&display=swap');
$light-bg: #f7f7f7;
$box-shadow: 0 1rem 1rem rgba(0, 0, 0, .05);
$black: #130f40;
$font-color:darkcyan;

.footer{
    margin-bottom: 0;
    .newsletter {
            text-align: center;
            margin-bottom: 1rem;
            h3 {
                font-size: 2rem;
                color: $font-color;
                font-family: 'Satisfy', cursive;
            }

            form {

                width: 30rem;
                height: 40px;
                margin: 1rem auto;
                max-width: 30rem;
                display: flex;
                overflow: hidden;
                border-radius: 0.5rem;

                @media (max-width:768px) {
                    width: 20rem;

                }

                .email {
                    width: 100%;
                    height: 100%;
                    color: $black;
                    text-transform: none;
                    font-size: 1.6rem;
                    padding: 1rem 1.2rem;
                    @media (max-width:768px) {
                    font-size: 1rem;
                }

                }

                .submit {
                    padding: 0 2rem;
                    font-size: 1.5rem;
                    color: white;
                    background-color: $font-color;
                    cursor: pointer;
                    border: none;

                    &:hover {
                        background-color: $black;
                    }
                    @media (max-width:768px) {
                    width: 8rem;
                    font-size: 1rem;
                    

                }
                }
            }
        }
        .box-container{
            text-align: center;
            background-color:#28373b;
            color: white;
            padding-bottom: 1rem;
            .box{
                h3{
                    color: $font-color;
                    text-transform: uppercase;
                }
                a{
                    display: block;
                    text-decoration: none;
                    color: rgba(245, 245, 245, 0.888);
                    padding: 0.5rem 0;

                    &:hover {

                        color: $font-color;

                        i {
                            padding-right: 1.5rem;
                        }
                    }

                    i {
                        color: $font-color;
                        padding-right: 0.5rem;
                    }
                    i{
                        color: $font-color;
                        
                    }
                }


            }
            .copyright{
                margin-top: 2rem;
                span{
                    color: $font-color;
                }
            }
        }
}
</style>
