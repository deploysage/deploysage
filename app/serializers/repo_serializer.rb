# :nodoc:
class RepoSerializer < ActiveModel::Serializer
  attributes :id, :github_identifier, :url, :created_at, :updated_at
end
