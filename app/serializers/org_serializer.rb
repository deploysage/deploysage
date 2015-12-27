# :nodoc:
class OrgSerializer < ActiveModel::Serializer
  attributes :id, :name

  # Always use strings for IDs: https://github.com/facebook/immutable-js/issues/282
  def id
    object.id.to_s
  end
end
