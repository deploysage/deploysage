FactoryGirl.define do
  factory :repo do
    sequence(:github_identifier) { |n| (1000 + n).to_s }
    sequence(:url) { |n| "https://github.com/deploysage/not_a_real_repo#{n}.git" }
    # org # disabled until we can scope Repo finds to user to avoid Brakeman warnings
  end
end
