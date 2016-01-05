FactoryGirl.define do
  factory :user do
    sequence(:uid) { |n| "uid-#{n}" }
    sequence(:handle) { |n| "deploysage-user-#{n}" }
  end
end
