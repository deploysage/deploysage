require 'factory_girl_rails'

class CreateFixtures
  include FactoryGirl::Syntax::Methods

  attr_accessor :fbuilder, :models, :fixed_time

  def initialize(fbuilder)
    @fbuilder = fbuilder
    @models = {}
    @fixed_time = Time.utc(2015, 3, 14, 9, 2, 6)
  end

  def create_all
    reset_pk_sequences
    set_up_naming
    create_orgs
    create_repos
    reset_pk_sequences
  end

  private

  def reset_pk_sequences
    puts 'Resetting Primary Key sequences'
    ActiveRecord::Base.connection.tables.each do |t|
      ActiveRecord::Base.connection.reset_pk_sequence!(t)
    end
  end

  def set_up_naming
    [Org, Repo].each do |model_class|
      fbuilder.name_model_with(model_class) do |model|
        model_name_from_hash(model_class, model)
      end
    end
  end

  def create_orgs
    model_hashes = [
      { name: 'Fixture Organization 1' }
    ]
    model_hashes.each do |model_hash|
      add_fixed_date(model_hash)
      model = create(:org, model_hash)
      name = nameify(model['name'])
      store_model_reference(:org, name, model)
    end
  end

  def create_repos
    model_hashes = [
      {
        org_id: models[:org][:fixture_organization_1].id,
        github_identifier: 47_444_606,
        url: 'https://github.com/deploysage/fixture-repo-1.git',
      }
    ]
    model_hashes.each do |model_hash|
      add_fixed_date(model_hash)
      model = create(:repo, model_hash)
      name = nameify(model['url'].split('/').last.split('.').first)
      store_model_reference(:repo, name, model)
    end
  end

  def add_fixed_date(model_hash)
    model_hash.merge!(created_at: fixed_time, updated_at: fixed_time)
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
