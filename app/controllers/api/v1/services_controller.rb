class Api::V1::ServicesController < Api::V1::BaseController
  def index
    respond_with Service.all
  end
end
