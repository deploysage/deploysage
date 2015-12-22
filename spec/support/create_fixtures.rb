require 'factory_girl'

class CreateFixtures
  include FactoryGirl::Syntax::Methods

  attr_accessor :fbuilder, :models

  def initialize(fbuilder)
    @fbuilder = fbuilder
    @models = {}
  end

  def create_all
    set_up_naming
    create_orgs
    create_repos
  end

  private

  def set_up_naming
    [Org, Repo].each do |model_class|
      fbuilder.name_model_with(model_class) do |model|
        model_name_from_hash(model_class, model)
      end
    end
  end

  def create_orgs
    model = create(:org, name: 'Fixture Organization 1')
    name = nameify(model['name'])
    store_model_reference(:org, name, model)
  end

  def create_repos
    model = create(
      :repo,
      org_id: models[:org][:fixture_organization_1].id,
      github_identifier: 47_444_606,
      url: 'https://github.com/deploysage/fixture-repo-1.git')
    name = nameify(model['url'].split('/').last.split('.').first)
    store_model_reference(:repo, name, model)
  end

  def nameify(text)
    text.gsub(/[[:space:]]/, '_').tr('-', '_').downcase
  end

  def store_model_reference(model_class_name, model_name, record)
    models[model_class_name] ||= {}
    models[model_class_name][model_name.to_sym] = record
  end

  def model_name_from_hash(model_class, model)
    models[model_class.to_s.downcase.to_sym].find { |_, v| v.id == model['id'] }[0]
  end
end
