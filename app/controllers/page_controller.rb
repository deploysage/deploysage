# :nodoc:
class PageController < ApplicationController
  def show
    @state = {
      orgsById: Org.all.each_with_object({}) do |org, orgs_by_id|
        orgs_by_id[org.id] = { id: org.id.to_s, name: org.name }
      end,
      orgs: Org.all.map { |org| org.id.to_s }
    }
  end
end
