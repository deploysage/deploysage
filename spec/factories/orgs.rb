FactoryGirl.define do
  factory :org do
    sequence(:name) { |n| "Organization #{n}" }
  end
end
