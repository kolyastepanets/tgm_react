require 'rails_helper'

RSpec.describe Api::V1::TasksController, type: :controller do
  include_context 'auth_user'

  let!(:tasks) { create_list(:task, 5, user: user) }

  describe 'GET #index' do
    before do
      get :index, format: :json
    end

    it 'has array of services' do
      resp = ActiveSupport::JSON.decode(response.body)
      expect(resp.count).to eql(5)
    end

    it 'responds ok' do
      should respond_with :ok
    end
  end
end
