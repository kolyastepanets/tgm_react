FactoryGirl.define do
  factory :task do
    title { Faker::Lorem.word }
    longtitude 35.053189
    latitude 48.463819
    association :service
    association :user
  end
end
