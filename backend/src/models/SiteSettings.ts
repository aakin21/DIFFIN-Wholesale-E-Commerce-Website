import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteSettings extends Document {
  key: string;
  aboutImages: {
    production?: string;
    showroom?: string;
    productDetails?: string;
    office?: string;
    packaging?: string;
  };
  updatedAt: Date;
}

const SiteSettingsSchema: Schema = new Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    default: 'main'
  },
  aboutImages: {
    production: { type: String, default: '' },
    showroom: { type: String, default: '' },
    productDetails: { type: String, default: '' },
    office: { type: String, default: '' },
    packaging: { type: String, default: '' }
  }
}, {
  timestamps: true
});

export default mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
