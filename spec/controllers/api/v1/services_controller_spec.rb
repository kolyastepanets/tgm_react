require 'rails_helper'

RSpec.describe Api::V1::ServicesController, type: :controller do
  let!(:services) { create_list(:service, 5) }

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
