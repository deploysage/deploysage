# :nodoc:
class RepoSerializer < ActiveModel::Serializer
  attributes :id, :org_id, :github_identifier, :url

  def id
    object.id.to_s
  end

  def org_id
    object.id.to_s
  end
end
