class Api::V1::TasksController < Api::V1::BaseController
  def index
    respond_with current_user.tasks
  end
end
