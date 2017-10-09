require 'rails_helper'

RSpec.describe User, type: :model do
  context 'Association' do
    it { should have_many(:tasks) }
  end
end
