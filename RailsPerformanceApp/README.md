# README

Setup Guide for the Rails application (or use the code here)

1. Create the Rails application

```bash
rails new PerfIssuesApp
cd PerfIssuesApp
```

2. Create the model objects

```bash
rails generate model User name:string email:string
rails generate model Post title:string content:text user:references
rails generate model Comment content:text user:references post:references
```

3. Create relationships between the model objects

`app/models/user.rb`

```ruby
class User < ApplicationRecord
  has_many :posts
  has_many :comments
end
```

`app/models/post.rb`

```ruby
class Post < ApplicationRecord
  belongs_to :user
  has_many :comments
end

```

`app/models/comment.rb`

```ruby
class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :post
end
```

4. Create a Rails controller

```bash
rails g controller Posts
```

5. Populate the posts_controller.rb file with two methods - one is broken, one loads objects ineffienciently (N+1 error)

```ruby
class PostsController < ApplicationController
    def index
      @posts = Post.all.limit(10)
    end

    def broken
        @posts = Post.all.limit(2)
        expected_to_fail # This method does not exist, so it will raise an exception
    end
  end
```

7. Add a view for the `index` method - this goes into the `app/views/posts/index.html.erb` method:

```ruby
<% @posts.each do |post| %>
  <h2><%= post.title %></h2>
  <p>By <%= post.user.name %></p> <!-- This causes the N+1 problem -->
<% end %>
```

8. Add routes for the methods in the Posts controller. These go into `config/routes.rb`:

```ruby
Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  get "posts" => "posts#index"
  get "broken" => "posts#broken"
end
```

9. Create the database tables with `rails db:migrate`

```bash
rails db:migrate
```

10. Seed some data - add this to `db/seeds.rb`

```ruby
10.times do |i|
  user = User.create(name: "User #{i}", email: "user#{i}@example.com")
  5.times do |j|
    post = user.posts.create(title: "Post #{j} by User #{i}", content: "This is the content for post #{j}.")
    3.times do |k|
      post.comments.create(content: "Comment #{k} on Post #{j} by User #{i}", user: user)
    end
  end
end
```

11. Run the `rails db:seed` command to populate the database:

```bash
rails db:seed
```

12. Now run the Rails application:

```bash
rails s
```