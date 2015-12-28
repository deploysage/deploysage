# :nodoc:
class PageController < ApplicationController
  def show
    @state = {
      orgs: Org.all.map { |org| OrgSerializer.new(org).attributes }
    }
  end
end
