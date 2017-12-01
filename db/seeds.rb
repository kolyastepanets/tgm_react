FactoryGirl.create_list :service, 20
# https://github.com/lynndylanhurley/devise_token_auth/issues/681
User.create(email: 'admin@example.com', password: 'Testing1').update(tokens: nil)
