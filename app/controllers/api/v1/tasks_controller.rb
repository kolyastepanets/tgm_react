class Api::V1::TasksController < Api::V1::BaseController
  before_action :load_task, only: [:update, :destroy]

  def index
    render json: current_user.tasks.order(:created_at)
  end

  def create
    task = current_user.tasks.create(task_params)
    respond_with :api, :v1, task
  end

  def update
    @task.update(task_params)
    render json: @task
  end

  def destroy
    @task.destroy
    head :no_content
  end

  private

  def load_task
    @task = Task.find(params['id'])
  end

  def task_params
    params.require(:task).permit(:title, :service_id, :longtitude, :latitude)
  end
end
