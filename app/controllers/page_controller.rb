# :nodoc:
class PageController < ApplicationController
  def show
    @state = {
      client_state: {
        origin: ENV.fetch('DS_ORIGIN', ''),
        ui_state: ENV.fetch('DS_UI_STATE', 'unauthenticated'),
      },
      orgs: Org.all.map { |org| OrgSerializer.new(org).attributes },
      repos: Repo.all.map { |repo| RepoSerializer.new(repo).attributes },
    }
  end
end
