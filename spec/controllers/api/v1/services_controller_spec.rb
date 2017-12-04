require 'rails_helper'

RSpec.describe Api::V1::ServicesController, type: :controller do
  include_context 'auth_user'

  let!(:services) { create_list(:service, 5, classification: 'electrician') }
  let!(:number_of_services) { Service::TYPES.count }

  describe 'GET #index' do
    before do
      get :index, params: { type: 'electrician' }, format: :json
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
