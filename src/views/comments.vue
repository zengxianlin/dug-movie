<template>
    <div class="comments">
        <h2>热门评论<span class="comments-count">({{movieDetails.ratings_count}}条)</span></h2>
        <ul>
            <li>

            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        props:['movieDetails'],
        created(){
            console.log(this.movieDetails)
        }
    }
</script>
<style scoped>
    .comments {
        background-color: #fff;
        margin: 0.4rem 0;
    }
    .comments h2{
        font-size: 0.5rem;
        font-weight: 600;
        padding: 0.3125rem 0.5rem;
        line-height: 1.5;
    }
    .comments-count{
        color: gray;
        font-size: 0.375rem;
        margin-left: 0.1rem;
    }
</style>