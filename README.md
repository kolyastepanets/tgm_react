#### Start

1. download project

2. setup
```sh
$ cp config/database.yml.sample config/database.yml
$ bundle install
$ bundle exec rails webpacker:install
$ bundle exec rails webpacker:install:react
$ rake db:create db:migrate db:seed
$ foreman start -f Procfile.dev
```

- email: admin@example.com
- password: Testing1
