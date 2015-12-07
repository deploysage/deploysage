require 'factory_girl'

class CreateFixtures
  include FactoryGirl::Syntax::Methods

  attr_accessor :fbuilder

  def initialize(fbuilder)
    @fbuilder = fbuilder
  end

  def create_all
    set_up_naming
    create_repos
  end

  private

  def set_up_naming
    fbuilder.name_model_with(Repo) do |record|
      record['url'].split('/').last.split('.').first.gsub('-','_')
    end
  end

  def create_repos
    create(:repo, github_identifier: 47444606, url: 'https://github.com/deploysage/fixture-repo-1.git')
  end
end
