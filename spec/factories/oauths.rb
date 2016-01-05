FactoryGirl.define do
  factory :oauth do
    sequence(:secret) { |n| "secret-#{n}" }
    sequence(:token) { |n| "token-#{n}" }
  end
end
