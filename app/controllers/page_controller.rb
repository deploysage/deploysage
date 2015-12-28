# :nodoc:
class PageController < ApplicationController
  def show
    @state = {
      orgs: Org.all.map { |org| OrgSerializer.new(org).attributes },
      repos: Repo.all.map { |repo| RepoSerializer.new(repo).attributes },
    }
  end
end
