class Api::V1::ServicesController < Api::V1::BaseController
  def index
    respond_with Service.where(classification: params['type'])
  end
end
