module Api
  module V1
    # :nodoc:
    class OrgsController < Api::V1::ApplicationController
      before_action :set_org, only: [:show, :update, :destroy]

      # GET /orgs
      def index
        @orgs = Org.all

        render json: @orgs
      end

      # GET /orgs/1
      def show
        render json: @org
      end

      # POST /orgs
      def create
        @org = Org.new(org_params)

        if @org.save
          render json: @org, status: :created, location: api_v1_orgs_url
        else
          render json: @org.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /orgs/1
      def update
        if @org.update(org_params)
          render json: @org
        else
          render json: @org.errors, status: :unprocessable_entity
        end
      end

      # DELETE /orgs/1
      def destroy
        @org.destroy
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_org
        @org = Org.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def org_params
        params.require(:org).permit(:name)
      end
    end
  end
end
