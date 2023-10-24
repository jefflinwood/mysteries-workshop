class PostsController < ApplicationController
    def index
      @posts = Post.all.limit(10)
    end

    def broken
        @posts = Post.all.limit(2)
        expected_to_fail # This method does not exist, so it will raise an exception
    end
  end
  
