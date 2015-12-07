# :nodoc:
class RepoSerializer < ActiveModel::Serializer
  attributes :id, :github_identifier, :url
end
