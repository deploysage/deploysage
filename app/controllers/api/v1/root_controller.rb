module Api
  module V1
    # :nodoc:
    class RootController < Api::V1::ApplicationController
      # GET /repos
      def index
        root_hash = {
          orgs_url: '/orgs',
          repos_url: '/repos',
        }
        render json: root_hash
      end
    end
  end
end
