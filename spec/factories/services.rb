FactoryGirl.define do
  factory :service do
    name { Faker::Lorem.word }
    classification { Service::TYPES.sample }
  end
end
