require 'rails_helper'

RSpec.describe Api::V1::TasksController, type: :controller do
  # include_context 'auth_user'

  let!(:tasks) { create_list(:task, 5) }
  let(:task) { create(:task) }
  let(:new_task) { build(:task) }
  let(:service) { create(:service) }
  let(:valid_params) do
    { task: { title: new_task.title, service_id: service.id } }
  end
  let(:invalid_params) do
    { task: { title: new_task.title } }
  end

  describe 'GET #index' do
    before do
      get :index, format: :json
    end

    it 'has array of tasks' do
      resp = ActiveSupport::JSON.decode(response.body)
      expect(resp.count).to eql(5)
    end

    it 'responds ok' do
      should respond_with :ok
    end
  end

  describe 'POST #create' do
    context 'with valid atrributes' do
      it 'saves new task' do
        post :create, params: valid_params, format: :json
        resp = ActiveSupport::JSON.decode(response.body)
        expect(resp['title']).to eq new_task.title
      end

      it 'should be success' do
        post :create, params: valid_params, format: :json
        expect(response).to be_success
      end
    end

    context 'with invalid attributes' do
      it 'does not save task' do
        expect { post :create, params: invalid_params, format: :json }.to_not change(Task, :count)
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid atrributes' do
      it 'saves new task' do
        put :update, params: { id: task.id, task: { title: 'new title' } }, format: :json
        resp = ActiveSupport::JSON.decode(response.body)
        expect(resp['title']).to eq 'new title'
      end

      it 'should be success' do
        put :update, params: { id: task.id, task: { title: 'new title' } }, format: :json
        expect(response).to be_success
      end
    end

    context 'with invalid attributes' do
      it 'does not update task' do
        put :update, params: { id: task.id, task: { service_id: '' } }, format: :json
        expect(task.title).to eq(task.reload.title)
      end
    end
  end

  describe 'DELETE #destroy' do
    before { task }

    it 'deletes task' do
      expect { delete :destroy, params: { id: task }, format: :json }.to change(Task, :count).by(-1)
    end
  end
end
