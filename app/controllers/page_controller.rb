# :nodoc:
class PageController < ApplicationController
  def show
    @state = {
      client_state: {
        origin: ENV.fetch('DS_ORIGIN', ''),
        ui_state: ENV.fetch('DS_UI_STATE', 'unauthenticated'),
      },
      orgs: [OrgSerializer.new(current_org).attributes],
      repos: Repo.all.map { |repo| RepoSerializer.new(repo).attributes },
    }
  end

  private

  def current_org
    # TODO: Org to use is hardcoded for now
    Org.find(1)
  end
end
