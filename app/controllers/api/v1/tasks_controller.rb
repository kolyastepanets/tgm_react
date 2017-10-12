class Api::V1::TasksController < Api::V1::BaseController
  def index
    respond_with Task.all
  end

  def create
    task = Task.create(task_params)
    respond_with :api, :v1, task
  end

  def destroy
    task = Task.find(params['id'])
    task.destroy
    head :ok
  end

  private

  def task_params
    params.require(:task).permit(:title, :service_id, :longtitude, :latitude)
  end
end
