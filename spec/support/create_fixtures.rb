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
    create_oauths
    create_orgs
    create_repos
    create_users
    reset_pk_sequences
  end

  private

  def reset_pk_sequences
    puts 'Resetting Primary Key sequences'
    ActiveRecord::Base.connection.tables.each do |t|
      ActiveRecord::Base.connection.reset_pk_sequence!(t)
    end
  end

  def create_oauths
    model_hashes = [
      {
        secret: 'secret-1',
        token: 'token-1',
      },
    ]
    create_fixture_model(:oauth, model_hashes) do |model|
      nameify(model['token'])
    end
  end

  def create_orgs
    model_hashes = [
      {
        name: 'Fixture Organization 1',
      },
    ]
    create_fixture_model(:org, model_hashes) do |model|
      nameify(model['name'])
    end
  end

  def create_repos
    model_hashes = [
      {
        org_id: models[:org][:fixture_organization_1].id,
        github_identifier: 47_444_606,
        url: 'https://github.com/deploysage/fixture-repo-1.git',
      },
    ]
    create_fixture_model(:repo, model_hashes) do |model|
      nameify(model['url'].split('/').last.split('.').first)
    end
  end

  def create_users
    model_hashes = [
      {
        uid: 'uid-1',
        handle: 'deploysage-user-1',
      },
    ]
    create_fixture_model(:user, model_hashes) do |model|
      nameify(model['handle'])
    end
  end

  def create_fixture_model(model_class_name, model_hashes)
    setup_naming_for(model_class_name)
    model_hashes.each do |model_hash|
      add_fixed_date(model_hash)
      model = create(model_class_name, model_hash)
      name = yield(model)
      store_model_reference(model_class_name, name, model)
    end
  end

  def setup_naming_for(model_class_name)
    model_class = model_class_name.to_s.classify.constantize
    fbuilder.name_model_with(model_class) do |model|
      model_name_from_hash(model_class, model)
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
