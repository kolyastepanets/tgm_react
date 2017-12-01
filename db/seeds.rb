FactoryGirl.create_list :service, 20
User.create(email: 'admin@example.com', password: 'Testing1').update(tokens: nil)
