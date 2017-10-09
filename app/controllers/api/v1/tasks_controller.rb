class Api::V1::TasksController < Api::V1::BaseController
  def index
    respond_with Task.all
  end
end
