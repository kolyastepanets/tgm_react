FactoryGirl.define do
  factory :user do
    email { Faker::Internet.email }
    name { Faker::Name.name }
    password 'Testing1'
    surname { Faker::Lorem.word }
  end
end
