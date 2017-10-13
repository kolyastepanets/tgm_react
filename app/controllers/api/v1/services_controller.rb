class Api::V1::ServicesController < Api::V1::BaseController
  def index
    respond_with Service.all
  end

  def types
    respond_with Service::TYPES
  end
end
