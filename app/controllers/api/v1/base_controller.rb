class Api::V1::BaseController < ApplicationController
  before_action :authenticate_api_v1_user!
  respond_to :json
end
