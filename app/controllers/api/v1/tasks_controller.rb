class Api::V1::TasksController < Api::V1::BaseController
  before_action :load_task, only: [:update, :destroy]

  def index
    render json: Task.includes(:service, :user)
  end

  def create
    task = Task.create(task_params)
    render json: task
  end

  def update
    @task.update(task_params)
    render json: @task
  end

  def destroy
    @task.destroy
    head :ok
  end

  private

  def load_task
    @task = Task.find(params['id'])
  end

  def task_params
    params.require(:task).permit(:title, :service_id, :longtitude, :latitude)
  end
end
