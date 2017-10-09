FactoryGirl.define do
  factory :task do
    title { Faker::Lorem.word }
    longtitude 1.5
    latitude 1.5
    association :service
    association :user
  end
end
